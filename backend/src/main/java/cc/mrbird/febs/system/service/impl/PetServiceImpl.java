package cc.mrbird.febs.system.service.impl;


import cc.mrbird.febs.common.domain.FebsConstant;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.SortUtil;
import cc.mrbird.febs.system.dao.PetMapper;
import cc.mrbird.febs.system.domain.Pet;
import cc.mrbird.febs.system.service.PetService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Service("petService")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class PetServiceImpl extends ServiceImpl<PetMapper, Pet> implements PetService {


    @Override
    public void createPet(Pet pet) {
        this.save(pet);
    }

    @Override
    public void deletePet(String[] petIds) throws Exception {
        List<String> list = Arrays.asList(petIds);
        this.baseMapper.deleteBatchIds(list);
    }

    @Override
    public IPage<Pet> findPetDetail(Pet pet, QueryRequest queryRequest) {
        try {
            LambdaQueryWrapper<Pet> queryWrapper = new LambdaQueryWrapper<>();
            Page<Pet> page = new Page<>();
            SortUtil.handlePageSort(queryRequest, page, true);
            return this.page(page,queryWrapper);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void updatePet(Pet pet) {
        this.baseMapper.updateById(pet);
    }
}
